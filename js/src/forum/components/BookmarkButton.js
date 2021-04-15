import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import BookmarksPage from './BookmarksPage';

/* global m, app */

export default class BookmarkButton extends Component {
    view(vnode) {
        const {post, className} = vnode.attrs;

        const bookmarked = post.attribute('bookmarked');

        return Button.component({
            className: className + (bookmarked ? ' Button--bookmarked' : ''),
            icon: bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark',
            onclick() {
                post.save({
                    bookmarked: !bookmarked,
                }).then(() => {
                    let alert = app.alerts.show({
                        type: 'success',
                        controls: app.current.matches(BookmarksPage) ? null : [
                            Button.component({
                                className: 'Button Button--link',
                                onclick: () => {
                                    m.route.set(app.route('postBookmarks'));
                                    app.alerts.dismiss(alert);
                                },
                            }, app.translator.trans('clarkwinkelmann-post-bookmarks.forum.alert.show-bookmarks')),
                        ],
                    }, app.translator.trans('clarkwinkelmann-post-bookmarks.forum.alert.' + (bookmarked ? 'removed' : 'added')));

                    m.redraw();
                });
            },
        }, app.translator.trans('clarkwinkelmann-post-bookmarks.forum.button.' + (bookmarked ? 'remove' : 'add')));
    }
}
