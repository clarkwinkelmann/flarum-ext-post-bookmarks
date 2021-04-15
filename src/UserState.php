<?php

namespace ClarkWinkelmann\PostBookmarks;

use Flarum\Database\AbstractModel;

/**
 * Used to pre-load the "BelongsToMany" state relationship
 * We don't ever read or write to this model, we just check if the relationship is null or not afterwards
 */
class UserState extends AbstractModel
{
    protected $table = 'post_user_bookmark';
}
