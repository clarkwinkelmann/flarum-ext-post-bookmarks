import {extend} from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import PostControls from 'flarum/forum/utils/PostControls';
import BookmarkButton from './components/BookmarkButton';
import CommentPost from 'flarum/forum/components/CommentPost';

/* global app */

export default function () {
    extend(PostControls, 'userControls', function (items, post) {
        if (!app.session.user) {
            return;
        }

        items.add('bookmark', BookmarkButton.component({
            className: 'Button',
            post,
        }));
    });

    extend(CommentPost.prototype, 'headerItems', function (items) {
        if (!app.session.user) {
            return;
        }

        items.add('bookmark', BookmarkButton.component({
            className: 'Button Button--link',
            post: this.attrs.post,
        }));
    });

    extend(CommentPost.prototype, 'actionItems', function (items) {
        if (!app.session.user) {
            return;
        }

        items.add('bookmark', BookmarkButton.component({
            className: 'Button Button--link',
            post: this.attrs.post,
        }));
    });
}
