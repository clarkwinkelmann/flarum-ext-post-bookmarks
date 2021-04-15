<?php

namespace ClarkWinkelmann\PostBookmarks\Listeners;

use Flarum\Post\Event\Saving;

class SavePost
{
    public function handle(Saving $event)
    {
        if (!isset($event->data['attributes']['bookmarked'])) {
            return;
        }

        $event->actor->assertRegistered();

        $currentValue = $event->post->bookmarks()->where('id', $event->actor->id)->exists();

        $newValue = !!$event->data['attributes']['bookmarked'];

        if ($newValue === $currentValue) {
            return;
        }

        if ($newValue) {
            $event->post->bookmarks()->attach($event->actor);
        } else {
            $event->post->bookmarks()->detach($event->actor);
        }
    }
}
