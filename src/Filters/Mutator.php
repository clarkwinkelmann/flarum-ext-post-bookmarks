<?php

namespace ClarkWinkelmann\PostBookmarks\Filters;

use ClarkWinkelmann\PostBookmarks\BookmarkablePost;
use Flarum\Filter\FilterState;
use Flarum\Query\QueryCriteria;

/**
 * We use a filter mutator to capture the actor because it's the only way to do it before eager loading is applied on the results
 */
class Mutator
{
    public function __invoke(FilterState $state, QueryCriteria $criteria)
    {
        BookmarkablePost::setStateUser($state->getActor());
    }
}
