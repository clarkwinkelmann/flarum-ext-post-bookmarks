<?php

namespace ClarkWinkelmann\PostBookmarks\Filters;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;
use Flarum\User\User;
use Illuminate\Database\Query\Builder;

class BookmarkedGambit implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'bookmarked';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $this->constrain($filterState->getQuery(), $filterState->getActor(), $negate);
    }

    public function constrain(Builder $query, User $actor, $negate)
    {
        $method = $negate ? 'whereNotIn' : 'whereIn';
        $query->$method('id', function (Builder $query) use ($actor) {
            $query->select('post_id')
                ->from('post_user_bookmark')
                ->where('user_id', $actor->id);
        });
    }
}
