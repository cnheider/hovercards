'use strict';

define('youtube-button', ['jquery'], function($) {
    function youtubeButton(video) {
        var button = $('<div class="deckard-youtube-button"></div>');
        video = $(video);

        var timeout;

        button.offset(video.offset());
        $(button).hover(function() {
            button.stop(true, true).css('opacity', 1);
            clearTimeout(timeout);
        }, function() {
            button.stop(true, true).css('opacity', 0);
            clearTimeout(timeout);
        });

        video.hover(function() {
            button.stop(true, true).css('opacity', 1);
            timeout = setTimeout(function() {
                button.stop(true, true).fadeTo(500, 0);
            }, 2000);
        }, function() {
            button.stop(true, true).css('opacity', 0);
            clearTimeout(timeout);
        });

        chrome.runtime.sendMessage({ cmd: 'load-html', filename: 'button.html' }, function(html) {
            button.html(html);
        });

        return button;
    }

    function putInVideo(video) {
        var button = youtubeButton('#player');

        $(video).prepend(button);
    }

    function putOnVideos(area) {
        var videos = $(area).find('object[data*="youtube.com/v/"],' +
                                  'embed[src*="youtube.com/v/"]');
        videos.each(function() {
            var video = $(this);
            var button = youtubeButton(video);
            video.before(button);
        });
    }

    youtubeButton.putInVideo = putInVideo;
    youtubeButton.putOnVideos = putOnVideos;

    return youtubeButton;
});
