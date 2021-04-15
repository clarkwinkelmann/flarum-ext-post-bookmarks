import {extend} from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
import BookmarksPage from './components/BookmarksPage';

/* global m, app */

export default function () {
    app.routes.postBookmarks = {
        path: '/bookmarked-posts',
        component: BookmarksPage,
    };

    extend(IndexPage.prototype, 'navItems', function (items) {
        if (!app.session.user) {
            return;
        }

        items.add('post-bookmarks', LinkButton.component({
            href: app.route('postBookmarks'),
            icon: 'fas fa-bookmark',
        }, app.translator.trans('clarkwinkelmann-post-bookmarks.forum.page.link')));
    });
}
