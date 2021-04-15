import Page from 'flarum/common/components/Page';
import Placeholder from 'flarum/common/components/Placeholder';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import CommentPost from 'flarum/forum/components/CommentPost';
import Link from 'flarum/common/components/Link';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';

/* global m, app */

/**
 * Based on PostsUserPage
 */
export default class BookmarksPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);

        this.loading = true;
        this.moreResults = false;
        this.posts = [];
        this.loadLimit = 20;

        this.refresh();
    }

    oncreate(vnode) {
        super.oncreate(vnode);

        app.setTitle(app.translator.trans('clarkwinkelmann-post-bookmarks.forum.page.title'));
    }

    view() {
        return (
            <div className="IndexPage">
                {IndexPage.prototype.hero()}
                <div className="container">
                    <div className="sideNavContainer">
                        <nav className="IndexPage-nav sideNav">
                            <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
                        </nav>
                        <div className="IndexPage-results sideNavOffset">
                            {this.content()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    content() {
        if (this.posts.length === 0 && !this.loading) {
            return m('.PostsUserPage', Placeholder.component({
                text: app.translator.trans('core.forum.user.posts_empty_text'),
            }));
        }

        let footer;

        if (this.loading) {
            footer = LoadingIndicator.component();
        } else if (this.moreResults) {
            footer = m('.PostsUserPage-loadMore', Button.component({
                className: 'Button',
                onclick: this.loadMore.bind(this),
            }, app.translator.trans('core.forum.user.posts_load_more_button')));
        }

        return m('.PostsUserPage', [
            m('ul.PostsUserPage-list', this.posts.map((post) => m('li', [
                m('.PostsUserPage-discussion', app.translator.trans('core.forum.user.in_discussion_text', {
                    discussion: <Link href={app.route.post(post)}>{post.discussion().title()}</Link>,
                })),
                CommentPost.component({post}),
            ]))),
            m('.PostsUserPage-loadMore', footer),
        ]);
    }

    refresh() {
        this.loading = true;
        this.posts = [];

        m.redraw();

        this.loadResults().then(this.parseResults.bind(this));
    }

    loadResults(offset) {
        return app.store.find('posts', {
            filter: {
                bookmarked: true,
                type: 'comment',
            },
            page: {
                offset,
                limit: this.loadLimit,
            },
            sort: '-createdAt',
        });
    }

    loadMore() {
        this.loading = true;
        this.loadResults(this.posts.length).then(this.parseResults.bind(this));
    }

    parseResults(results) {
        this.loading = false;

        [].push.apply(this.posts, results);

        this.moreResults = results.length >= this.loadLimit;
        m.redraw();

        return results;
    }
}
