/* global app */

app.initializers.add('clarkwinkelmann-post-bookmarks', () => {
    app.extensionData
        .for('clarkwinkelmann-post-bookmarks')
        .registerSetting({
            setting: 'post-bookmarks.buttonPosition',
            label: app.translator.trans('clarkwinkelmann-post-bookmarks.admin.settings.buttonPosition'),
            type: 'select',
            options: {
                header: app.translator.trans('clarkwinkelmann-post-bookmarks.admin.settings.buttonPositionHeader'),
                actions: app.translator.trans('clarkwinkelmann-post-bookmarks.admin.settings.buttonPositionActions'),
                menu: app.translator.trans('clarkwinkelmann-post-bookmarks.admin.settings.buttonPositionMenu'),
            },
        })
        .registerSetting({
            setting: 'post-bookmarks.headerBadge',
            label: app.translator.trans('clarkwinkelmann-post-bookmarks.admin.settings.headerBadge'),
            type: 'boolean',
        });
});
