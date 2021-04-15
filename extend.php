<?php

namespace ClarkWinkelmann\PostBookmarks;

use Flarum\Api\Controller;
use Flarum\Api\Serializer\PostSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\Post\Event\Saving;
use Flarum\Post\Filter\PostFilterer;
use Flarum\Post\Post;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Relations;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->route('/bookmarked-posts', 'post-bookmarks'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Model(Post::class))
        ->relationship('bookmarks', function (Post $post): Relations\BelongsToMany {
            return $post->belongsToMany(User::class, 'post_user_bookmark', 'post_id')->withTimestamps();
        })
        ->relationship('bookmarkState', function (Post $post): Relations\HasOne {
            $user = BookmarkablePost::getStateUser();

            return $post->hasOne(UserState::class, 'post_id')->where('user_id', $user ? $user->id : null);
        }),

    (new Extend\ApiController(Controller\ListPostsController::class))
        ->addInclude('bookmarkState'),

    (new Extend\ApiController(Controller\ShowDiscussionController::class))
        ->addInclude('posts.bookmarkState'),

    (new Extend\ApiSerializer(PostSerializer::class))
        ->attribute('bookmarked', function (PostSerializer $serializer, Post $post): bool {
            BookmarkablePost::setStateUser($serializer->getActor());

            // This will use either a newly retrieved relationship based on the state above,
            // or a previously eager-loaded relationship (ListPostsController, ShowDiscussionController)
            return !is_null($post->bookmarkState);
        }),

    (new Extend\Event())
        ->listen(Saving::class, Listeners\SavePost::class),

    (new Extend\Filter(PostFilterer::class))
        ->addFilter(Filters\BookmarkedGambit::class)
        ->addFilterMutator(Filters\Mutator::class),

    (new Extend\ModelVisibility(Discussion::class))
        ->scope(Access\ScopeDiscussionVisibility::class),

    (new Extend\Settings())
        ->serializeToForum('post-bookmarks.buttonPosition', 'post-bookmarks.buttonPosition')
        ->serializeToForum('post-bookmarks.headerBadge', 'post-bookmarks.headerBadge', 'boolval'),
];
