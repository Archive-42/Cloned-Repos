window._EPYTWIZ_ = window._EPYTWIZ_ || {};
(function ($)
{

    $.fn.followTo = function (pos, startTop)
    {
        var $this = this,
                $window = $(window);

        $window.scroll(function (e)
        {
            if ($window.scrollTop() > pos)
            {
                $this.css({
                    position: 'absolute',
                    top: pos
                });
            }
            else
            {
                $this.css({
                    position: 'fixed',
                    top: startTop
                });
            }
        });
    };

    window._EPYTWIZ_.getUrlParameter = function (name)
    {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    window._EPYTWIZ_.selectText = window._EPYTWIZ_.selectText || function (ele)
    {
        if (document.selection)
        {
            var range = document.body.createTextRange();
            range.moveToElementText(ele);
            range.select();
        }
        else if (window.getSelection)
        {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNode(ele);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };


    window._EPYTWIZ_.loadmovieplain = window._EPYTWIZ_.loadmovieplain || function (vid)
    {
        var codetemplate = '<iframe width="600" height="368" src="//www.youtube.com/embed/~ytid?autoplay=1" frameborder="0" allowfullscreen ></iframe>';
        codetemplate = codetemplate.replace(/~ytid/g, vid);
        $("#watch" + vid).html(codetemplate);
        $('#closeme' + vid).css('display', 'inline');
        $("#moviecontainer" + vid).css('display', 'block');
        if (document.getElementById('scrollwatch' + vid))
        {
            setTimeout(function ()
            {
                $('html, body').animate({
                    scrollTop: $('#scrollwatch' + vid).offset().top - 50
                }, 250, function ()
                {
                });

            }, 800);
        }
    };


    window._EPYTWIZ_.closeme = window._EPYTWIZ_.closeme || function (vid)
    {
        $("#moviecontainer" + vid).css('display', 'none');
        $("#watch" + vid).html("");
    };

    $(document).ready(function ()
    {
        $('.wiz-accordion').accordion({
            header: "> h3",
            collapsible: true,
            active: false,
            icons: {
                header: "ui-icon-circle-arrow-e",
                activeHeader: "ui-icon-circle-arrow-s"
            },
            heightStyle: "content",
            autoHeight: false
        }).find('h3.header-go').click(function ()
        {
            window.open($(this).find('a').attr('href'), '_blank');
            return false;
        });

        $('.playlist-tabs').tabs();
        $('.livestream-tabs').tabs();

        if (window._EPYTWIZ_.acc_expand)
        {
            $('.wiz-accordion #' + window._EPYTWIZ_.acc_expand).click();
        }

        $('form.wizform').each(function ()
        {
            $thisForm = $(this);
            $thisForm.find('.txturlpastecustom').on('paste', function ()
            {
                $thisTxtUrl = $(this);
                setTimeout(function ()
                {
                    var thepaste = $.trim($thisTxtUrl.val());
                    var badpaste = /<.*/i;
                    if (badpaste.test(thepaste))
                    {
                        var reg = new RegExp('(?:https?://)?(?:www\\.)?(?:youtu\\.be/|youtube\\.com(?:/embed/|/v/|/watch\\?v=))([\\w-]{10,12})', 'ig');
                        //get matches found for the regular expression
                        var matches = reg.exec(thepaste);
                        //check if we have found a match for a YouTube video
                        //will support legacy code, shortened urls and
                        if (matches)
                        {
                            var ytid = matches[1];
                            $thisTxtUrl.val('https://www.youtube.com/watch?v=' + ytid);
                        }
                        else
                        {
                            $thisTxtUrl.val('https://www.youtube.com/watch?v=');
                        }
                        $thisForm.find('.badpaste').show();

                    }
                    else
                    {
                        $thisForm.find('.badpaste').hide();
                    }

                }, 100);
            });
        });

        var $epyt_wiz_wrap = $('#epyt_wiz_wrap');

        $epyt_wiz_wrap.on('click', '.copycode', function ()
        {
            window._EPYTWIZ_.selectText(this);
        });

        $epyt_wiz_wrap.on('click', '.inserttopost', function ()
        {
            var targetdomain = window.location.toString().split("/")[0] + "//" + window.location.toString().split("/")[2];
            var embedline = $(this).attr("rel");
            var gbclientId = window._EPYTWIZ_.getUrlParameter('clientId');
            parent.postMessage("youtubeembedplus|" + embedline + (gbclientId ? '|clientId=' + gbclientId : ''), targetdomain);
        });

        $epyt_wiz_wrap.on('click', '.resultdiv .load-movie', function ()
        {
            window._EPYTWIZ_.loadmovieplain($(this).closest('.resultdiv').data('vid'));
            return false;
        });

        $epyt_wiz_wrap.on('click', '.moviecontainer a.closeme', function ()
        {
            window._EPYTWIZ_.closeme($(this).data('vid'));
        });

    });
})(jQuery);