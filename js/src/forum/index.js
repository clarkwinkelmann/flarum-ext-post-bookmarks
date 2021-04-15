import addDiscussionControls from './addDiscussionControls';
import addPage from './addPage';

/* global app */

app.initializers.add('clarkwinkelmann-bookmarks', () => {
    addDiscussionControls();
    addPage();
});
