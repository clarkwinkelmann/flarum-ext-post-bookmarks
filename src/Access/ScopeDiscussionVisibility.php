<?php

namespace ClarkWinkelmann\PostBookmarks\Access;

use ClarkWinkelmann\PostBookmarks\BookmarkablePost;
use Flarum\User\User;

/**
 * We use a visibility scope on discussion because that's the only way to capture the actor in ShowDiscussionController
 * before ShowDiscussionController::loadPosts eager-loads the relationships
 */
class ScopeDiscussionVisibility
{
    public function __invoke(User $actor)
    {
        BookmarkablePost::setStateUser($actor);
    }
}
