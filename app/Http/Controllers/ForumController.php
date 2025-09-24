<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Post; // <-- Added this import
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ForumController extends Controller
{
    /**
     * Display a list of all forum topics.
     */
    public function index()
    {
        // Get all topics and their associated user
        $topics = Topic::with('user')->latest()->get();

        // Render the Forum/index.tsx page and pass the topics data
        return Inertia::render('Forum/index', [
            'topics' => $topics,
        ]);
    }

    /**
     * Show the form for creating a new topic.
     */
    public function create()
    {
        // Render the Forum/Create.tsx page
        return Inertia::render('Forum/Create');
    }

    /**
     * Store a newly created topic in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        Topic::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('forum.index')->with('success', 'Topic created successfully!');
    }

    /**
     * Display the specified topic.
     */
    public function show(Topic $topic)
    {
        // Get the topic with its creator and all its posts with their authors
        $topic->load(['user', 'posts.user']);

        // Render the Forum/Show.tsx page and pass the topic data
        return Inertia::render('Forum/Show', [
            'topic' => $topic,
        ]);
    }

    /**
     * Store a newly created post for a topic.
     */
    public function storePost(Request $request, Topic $topic)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $topic->posts()->create([
            'content' => $request->content,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('forum.show', $topic->slug)->with('success', 'Post created successfully!');
    }
}