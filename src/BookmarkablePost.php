<?php

namespace ClarkWinkelmann\PostBookmarks;

use Flarum\User\User;

/**
 * A helper class to hold our static properties for the Post model
 */
class BookmarkablePost
{
    protected static $stateUser;

    public static function getStateUser(): ?User
    {
        return static::$stateUser;
    }

    public static function setStateUser(User $user)
    {
        static::$stateUser = $user;
    }
}
