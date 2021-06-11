<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        // In case a user migrates from the extension on the FlarumTR namespace
        if ($schema->hasTable('post_user_bookmark')) {
            return;
        }

        $schema->create('post_user_bookmark', function (Blueprint $table) {
            $table->unsignedInteger('post_id');
            $table->unsignedInteger('user_id');
            $table->timestamps();

            $table->primary(['post_id', 'user_id']);

            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('post_user_bookmark');
    },
];
