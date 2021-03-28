<?php

if (self::vi_logged_in())
{
    self::$admin_page_hooks[] = add_submenu_page('youtube-my-preferences', 'Monetize With vi', '<img style="width: 16px; height: 16px; vertical-align: text-top;" src="' . plugins_url(self::$folder_name . '/images/icon-monetize.svg') . '" />&nbsp;&nbsp;Monetize', 'manage_options', 'youtube-ep-vi', array(get_class(), 'vi_admin_dashboard'));
}