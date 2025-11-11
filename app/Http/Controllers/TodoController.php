<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $filter = $request->input('filter');

        $todos = Todo::where('user_id', Auth::id())
            ->when($search, function ($query, $search) {
                return $query->search($search);
            })
            ->when($filter, function ($query, $filter) {
                return $query->filter($filter);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        // Statistik
        $stats = [
            'total' => Todo::where('user_id', Auth::id())->count(),
            'finished' => Todo::where('user_id', Auth::id())->where('is_finished', true)->count(),
            'unfinished' => Todo::where('user_id', Auth::id())->where('is_finished', false)->count(),
        ];

        return Inertia::render('App/Todos/IndexPage', [
            'todos' => $todos,
            'stats' => $stats,
            'filters' => [
                'search' => $search,
                'filter' => $filter,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('App/Todos/CreatePage');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $todo = new Todo();
        $todo->user_id = Auth::id();
        $todo->title = $validated['title'];
        $todo->description = $validated['description'] ?? null;
        $todo->is_finished = false;

        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('todos', 'public');
            $todo->cover = $path;
        }

        $todo->save();

        return redirect()->route('todos.index')->with('success', 'Todo berhasil ditambahkan!');
    }

    public function show(Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('App/Todos/ShowPage', [
            'todo' => $todo,
        ]);
    }

    public function edit(Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('App/Todos/EditPage', [
            'todo' => $todo,
        ]);
    }

    public function update(Request $request, Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_finished' => 'boolean',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $todo->title = $validated['title'];
        $todo->description = $validated['description'] ?? null;
        $todo->is_finished = $validated['is_finished'] ?? false;

        if ($request->hasFile('cover')) {
            // Hapus cover lama jika ada
            if ($todo->cover) {
                Storage::disk('public')->delete($todo->cover);
            }
            $path = $request->file('cover')->store('todos', 'public');
            $todo->cover = $path;
        }

        $todo->save();

        return redirect()->route('todos.index')->with('success', 'Todo berhasil diperbarui!');
    }

    public function destroy(Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        // Hapus cover jika ada
        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        $todo->delete();

        return redirect()->route('todos.index')->with('success', 'Todo berhasil dihapus!');
    }

    public function updateCover(Request $request, Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'cover' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Hapus cover lama jika ada
        if ($todo->cover) {
            Storage::disk('public')->delete($todo->cover);
        }

        $path = $request->file('cover')->store('todos', 'public');
        $todo->cover = $path;
        $todo->save();

        return back()->with('success', 'Cover berhasil diperbarui!');
    }

    public function toggleFinish(Todo $todo)
    {
        if ($todo->user_id !== Auth::id()) {
            abort(403);
        }

        $todo->is_finished = !$todo->is_finished;
        $todo->save();

        return back()->with('success', 'Status todo berhasil diperbarui!');
    }
}