<?php

namespace App\Http\Controllers;

use App\Models\DocumentDetails;
use App\Models\Documents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DocumentsController extends Controller
{
    //
    public function addDocument(Request $request)
    {

        $user = $request->get('user');
        if ($user->role != "maker") return response()->json(['message' => 'unauthorized'], 401);
        $nasabah = $request->nasabah;

        $validated = Validator::make($request->all(), [
            'document_subject' => 'required',
            'nasabah' => 'required'
        ]);
        if ($validated->fails()) return response()->json($validated->errors(), 400);

        try {
            DB::beginTransaction();
            $document = Documents::create([
                'document_subject' => $request->document_subject,
                'status' => 'On Progress',
                'created_by' => $user->user_id
            ]);
            $detail = [];
            foreach ($nasabah as $key) {
                $documentDetail = DocumentDetails::create([
                    'document_no' => $document['document_no'],
                    'nama_nasabah' => $key['nama_nasabah'],
                    'amount' => $key['amount']
                ]);
                $detail = [...$detail, $documentDetail];
            }
            DB::commit();
            return response()->json(['document' => $document, 'document_detail' => $detail], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json($th, 500);
        }
    }

    public function getDocuments(Request $request)
    {
        try {
            $user = $request->get('user');
            $subject = $request->query('subject');
            $order = 'DESC';
            $page = 1;
            if ($request->query('page')) $page =  intval($request->query('page'));
            if ($request->query('order')) $order = $request->query('order');
            $limit = 10;
            $offset = 0;
            if ($page) $offset = $limit * ($page - 1);
            $where = [];
            if ($user->role == "maker") $where = [...$where,   ['created_by', '=', $user->user_id]];
            if ($subject) $where = [...$where, ['document_subject', 'like', '%' . $subject . '%']];
            $documents = Documents::with(['user', 'document_detail'])
                ->where($where)
                ->skip($offset)
                ->take($limit)
                ->orderBy('document_no', $order)
                ->get();
            $countDocumments = Documents::with(['user', 'document_detail'])->where($where)->get();
            $result = [
                'totalData' => count($countDocumments),
                'data' => $documents,
                'currentPage' => $page,
                'totalPage' => ceil(count($countDocumments) / $limit)
            ];
            return response()->json($result, 200);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }

    public function deleteDocument(Request $request)
    {
        try {
            $user = $request->get('user');
            $id = $request->route('id');
            $document = Documents::find($id);
            if (!$document) return response()->json(['message' => 'data not found'], 404);
            if ($document['created_by'] != $user->user_id) return response()->json(['message' => 'unauthorized'], 401);
            DB::beginTransaction();
            $response = Documents::destroy($id);
            $responseDetail = DocumentDetails::where('document_no', $document['document_no'])->delete();
            DB::commit();
            return response()->json(['message' => 'success to delete'], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json($th, 500);
        }
    }

    public function updateDocument(Request $request)
    {
        try {
            $user = $request->get('user');
            $id = $request->route('id');
            $document = Documents::find($id);
            if ($user->role != "approver") return response()->json(['message' => 'unauthorized'], 401);
            if (!$document) return response()->json(['message' => 'data not found'], 404);

            $validated = Validator::make($request->all(), [
                'status' => 'required',
                'remark' => 'required'
            ]);
            if ($validated->fails()) return response()->json($validated->errors(), 400);
            $document->update([
                'status' => $request->status,
                'remark' => $request->remark
            ]);
            return response()->json(['message' => 'status success to updated'], 200);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }
}
