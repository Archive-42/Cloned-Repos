<?php

// Copyright (c) 2016 Interfacelab LLC. All rights reserved.
//
// Released under the GPLv3 license
// http://www.gnu.org/licenses/gpl-3.0.html
//
// Uses code from:
// Persist Admin Notices Dismissal
// by Agbonghama Collins and Andy Fragen
//
// **********************************************************************
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// **********************************************************************
namespace MediaCloud\Plugin\Tools\Storage\CLI;

use  MediaCloud\Plugin\CLI\Command ;
use  MediaCloud\Plugin\Tasks\TaskReporter ;
use  MediaCloud\Plugin\Tools\Storage\StorageToolSettings ;
use  MediaCloud\Plugin\Tools\Browser\Tasks\ImportFromStorageTask ;
use  MediaCloud\Plugin\Tools\Integrations\PlugIns\Elementor\Tasks\UpdateElementorTask ;
use  MediaCloud\Plugin\Tools\Integrations\PlugIns\NextGenGallery\Tasks\MigrateNextGenTask ;
use  MediaCloud\Plugin\Tools\Storage\StorageTool ;
use  MediaCloud\Plugin\Tools\Storage\Tasks\MigrateFromOtherTask ;
use  MediaCloud\Plugin\Tools\Storage\Tasks\MigrateTask ;
use  MediaCloud\Plugin\Tools\Storage\Tasks\RegenerateThumbnailTask ;
use  MediaCloud\Plugin\Tools\Storage\Tasks\UnlinkTask ;
use  MediaCloud\Plugin\Tools\ToolsManager ;
use  MediaCloud\Plugin\Utilities\Logging\Logger ;
use  MediaCloud\Vendor\GuzzleHttp\Client ;
use function  MediaCloud\Plugin\Utilities\arrayPath ;

if ( !defined( 'ABSPATH' ) ) {
    header( 'Location: /' );
    die;
}

/**
 * Import to Cloud Storage, rebuild thumbnails, etc.
 * @package MediaCloud\Plugin\CLI\Storage
 */
class StorageCommands extends Command
{
    private  $debugMode = false ;
    /**
     * Migrates the media library to the cloud.
     *
     * ## OPTIONS
     *
     * [--limit=<number>]
     * : The maximum number of items to process, default is infinity.
     *
     * [--offset=<number>]
     * : The starting offset to process.  Cannot be used with page.
     *
     * [--page=<number>]
     * : The starting offset to process.  Page numbers start at 1.  Cannot be used with offset.
     *
     * [--path-handling=<string>]
     * : Controls the upload path.  'preserve' will preserve the files current path, 'replace' will replace it with the custom prefix defined in cloud storage settings.  'prepend' will prepend the custom prefix with the existing upload directory.
     * ---
     * default: preserve
     * options:
     *   - preserve
     *   - replace
     *   - prepend
     * ---
     *
     * [--skip-imported]
     * : Skips images that have already been migrated to storage.
     *
     * [--skip-thumbnails]
     * : Skips uploading thumbnails.  Requires Imgix.
     *
     * [--verify]
     * : Verifies the migration and generates a report with the details
     *
     * [--order-by=<string>]
     * : The field to sort the items to be imported by. Valid values are 'date', 'title' and 'filename'.
     *
     * [--delete-migrated]
     * : Deletes migrated media from your local WordPress server.  Note: You must have Delete Uploads enabled in Cloud Storage for this setting to have any effect.  If you have Delete Uploads disabled, turning this on will have zero effect.
     * ---
     * options:
     *   - date
     *   - title
     *   - filename
     * ---
     *
     * [--order=<string>]
     * : The sort order. Valid values are 'asc' and 'desc'.
     * ---
     * default: asc
     * options:
     *   - asc
     *   - desc
     * ---
     *
     * [--delete-migrated]
     * : Deletes migrated media from your local WordPress server.  Note: You must have Delete Uploads enabled in Cloud Storage for this setting to have any effect.  If you have Delete Uploads disabled, turning this on will have zero effect.
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \Exception
     */
    public function migrateToCloud( $args, $assoc_args )
    {
        /** @var \Freemius $media_cloud_licensing */
        global  $media_cloud_licensing ;
        self::Error( "Only available in the Premium version.  To upgrade: https://mediacloud.press/pricing/" );
    }
    
    /**
     * Imports media from the cloud to WordPress.
     *
     * ## OPTIONS
     *
     * [--import-path=<string>]
     * : The path on cloud storage to import from
     *
     * [--import-only]
     * : Don't download, import to database only.
     *
     * [--skip-thumbnails]
     * : Skips any images that look like they might be thumbnails. If this option is on, you may import images that are thumbnails but they will be treated as individual images.  Default is true.
     *
     * [--preserve-paths=<string>]
     * : When downloading images, maintain the directory structure that is on cloud storage.
     * ---
     * default: preserve
     * options:
     *   - preserve
     *   - replace
     *   - prepend
     * ---
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \Exception
     */
    public function importFromCloud( $args, $assoc_args )
    {
        /** @var \Freemius $media_cloud_licensing */
        global  $media_cloud_licensing ;
        self::Error( "Only available in the Premium version.  To upgrade: https://mediacloud.press/pricing/" );
    }
    
    /**
     * Regenerate thumbnails
     *
     * ## OPTIONS
     *
     * [--limit=<number>]
     * : The maximum number of items to process, default is infinity.
     *
     * [--offset=<number>]
     * : The starting offset to process.  Cannot be used with page.
     *
     * [--page=<number>]
     * : The starting offset to process.  Page numbers start at 1.  Cannot be used with offset.
     *
     * [--order-by=<string>]
     * : The field to sort the items to be imported by. Valid values are 'date', 'title' and 'filename'.
     * ---
     * options:
     *   - date
     *   - title
     *   - filename
     * ---
     *
     * [--order=<string>]
     * : The sort order. Valid values are 'asc' and 'desc'.
     * ---
     * default: asc
     * options:
     *   - asc
     *   - desc
     * ---
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \Exception
     */
    public function regenerate( $args, $assoc_args )
    {
        /** @var \Freemius $media_cloud_licensing */
        global  $media_cloud_licensing ;
        self::Error( "Only available in the Premium version.  To upgrade: https://mediacloud.press/pricing/" );
    }
    
    /**
     * Unlinks media from the cloud.  Important: This will not attempt to download any media from the cloud before it unlinks it.
     *
     * ## OPTIONS
     *
     * [--limit=<number>]
     * : The maximum number of items to process, default is infinity.
     *
     * [--offset=<number>]
     * : The starting offset to process.  Cannot be used with page.
     *
     * [--page=<number>]
     * : The starting offset to process.  Page numbers start at 1.  Cannot be used with offset.
     *
     * [--order-by=<string>]
     * : The field to sort the items to be imported by. Valid values are 'date', 'title' and 'filename'.
     * ---
     * options:
     *   - date
     *   - title
     *   - filename
     * ---
     *
     * [--order=<string>]
     * : The sort order. Valid values are 'asc' and 'desc'.
     * ---
     * default: asc
     * options:
     *   - asc
     *   - desc
     * ---
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \Exception
     */
    public function unlink( $args, $assoc_args )
    {
        Command::Out( "", true );
        Command::Warn( "%WThis command only unlinks media attachments from cloud storage, \nit will not download any media from cloud storage. If the attachments \nyou are unlinking do not exist on your server, you will have broken \nimages on your site.%n" );
        Command::Out( "", true );
        \WP_CLI::confirm( "Are you sure you want to continue?", $assoc_args );
        $options = $assoc_args;
        if ( isset( $options['limit'] ) ) {
            
            if ( isset( $options['page'] ) ) {
                $options['offset'] = max( 0, ($assoc_args['page'] - 1) * $assoc_args['limit'] );
                unset( $options['page'] );
            }
        
        }
        
        if ( isset( $assoc_args['order-by'] ) ) {
            $orderBy = $assoc_args['order-by'];
            $dir = arrayPath( $assoc_args, 'order', 'asc' );
            unset( $assoc_args['order-by'] );
            unset( $assoc_args['order'] );
            $assoc_args['sort-order'] = $orderBy . '-' . $dir;
        }
        
        /** @var UnlinkTask $task */
        $task = new UnlinkTask();
        $this->runTask( $task, $options );
    }
    
    /**
     * Migrate NextGen Gallery images to cloud storage.
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \Exception
     */
    public function migrateNGG( $args, $assoc_args )
    {
        global  $media_cloud_licensing ;
        self::Error( "Only available in the Premium version.  To upgrade: https://mediacloud.press/pricing/" );
    }
    
    /**
     * Updates Elementor's data with the correct URLs.
     *
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \Exception
     */
    public function updateElementor( $args, $assoc_args )
    {
        global  $media_cloud_licensing ;
        self::Error( "Only available in the Premium version.  To upgrade: https://mediacloud.press/pricing/" );
    }
    
    /**
     * Migrate other plugin settings
     *
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \Exception
     */
    public function migrateFromOther( $args, $assoc_args )
    {
        /** @var MigrateFromOtherTask $task */
        $task = new MigrateFromOtherTask();
        $this->runTask( $task, [] );
    }
    
    /**
     * Migrates any media that was uploaded with Human Made S3 Uploads plugin
     *
     * ## OPTIONS
     *
     * [--skip-imported]
     * : Skip imported items
     *
     * [--limit=<number>]
     * : The maximum number of items to process, default is infinity.
     *
     * [--offset=<number>]
     * : The starting offset to process.  Cannot be used with page.
     *
     * [--page=<number>]
     * : The starting offset to process.  Page numbers start at 1.  Cannot be used with offset.
     *
     * [--order-by=<string>]
     * : The field to sort the items to be imported by. Valid values are 'date', 'title' and 'filename'.
     * ---
     * options:
     *   - date
     *   - title
     *   - filename
     * ---
     *
     * [--order=<string>]
     * : The sort order. Valid values are 'asc' and 'desc'.
     * ---
     * default: asc
     * options:
     *   - asc
     *   - desc
     * ---
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function migrateS3Uploads( $args, $assoc_args )
    {
        
        if ( !is_plugin_active( 's3-uploads/s3-uploads.php' ) ) {
            self::Error( "S3 Uploads must be installed and activated." );
            exit( 1 );
        }
        
        Command::Out( "", true );
        Command::Warn( "%WThis command will make some changes to your database that are totally reversible.  However, it's always a good idea to backup your database first.%n" );
        Command::Out( "", true );
        $result = \WP_CLI::confirm( "Are you sure you want to continue?", $assoc_args );
        self::Info( $result, true );
        $postArgs = [
            'post_type'   => 'attachment',
            'post_status' => 'inherit',
        ];
        if ( $assoc_args['skip-imported'] ) {
            $postArgs['meta_query'] = [
                'relation' => 'AND',
                [
                'key'     => '_wp_attachment_metadata',
                'value'   => '"s3"',
                'compare' => 'NOT LIKE',
                'type'    => 'CHAR',
            ],
                [
                'key'     => 'ilab_s3_info',
                'compare' => 'NOT EXISTS',
            ],
            ];
        }
        
        if ( isset( $assoc_args['limit'] ) ) {
            $postArgs['posts_per_page'] = $assoc_args['limit'];
            
            if ( isset( $assoc_args['offset'] ) ) {
                $postArgs['offset'] = $assoc_args['offset'];
            } else {
                if ( isset( $assoc_args['page'] ) ) {
                    $postArgs['offset'] = max( 0, ($assoc_args['page'] - 1) * $assoc_args['limit'] );
                }
            }
        
        } else {
            $postArgs['nopaging'] = true;
        }
        
        
        if ( isset( $assoc_args['order-by'] ) && in_array( $assoc_args['order-by'], [ 'date', 'title', 'filename' ] ) ) {
            
            if ( $assoc_args['order-by'] == 'filename' ) {
                $postArgs['meta_key'] = '_wp_attached_file';
                $postArgs['orderby'] = 'meta_value';
            } else {
                $postArgs['orderby'] = $assoc_args['order-by'];
            }
            
            $postArgs['order'] = ( isset( $assoc_args['order'] ) && $assoc_args['order'] == 'desc' ? 'DESC' : 'ASC' );
        }
        
        $q = new \WP_Query( $postArgs );
        $postCount = count( $q->posts );
        
        if ( $postCount == 0 ) {
            self::Error( "No posts found." );
            exit( 0 );
        }
        
        $currentIndex = 1;
        self::Info( "Found {$postCount} posts.", true );
        /** @var \S3_Uploads $s3Uploads */
        $s3Uploads = \S3_Uploads::get_instance();
        $s3Base = trailingslashit( $s3Uploads->get_s3_url() );
        $s3Acl = ( defined( 'S3_UPLOADS_OBJECT_ACL' ) ? S3_UPLOADS_OBJECT_ACL : 'public-read' );
        $host = get_home_url( '/' );
        $guzzle = new Client();
        /** @var \WP_Post $post */
        foreach ( $q->posts as $post ) {
            
            if ( strpos( $post->guid, $host ) === 0 ) {
                self::Info( "[{$currentIndex} of {$postCount}] Skipping ({$post->ID}) {$post->post_title} ({$post->guid}) ... ", true );
                $currentIndex++;
                continue;
            }
            
            
            if ( filter_var( $post->guid, FILTER_VALIDATE_URL ) === false ) {
                self::Info( "[{$currentIndex} of {$postCount}] Skipping invalid URL ({$post->ID}) {$post->post_title} ({$post->guid}) ... ", true );
                $currentIndex++;
                continue;
            }
            
            self::Info( "[{$currentIndex} of {$postCount}] Processing ({$post->ID}) {$post->post_title} ({$post->guid}) ... ", false );
            $currentIndex++;
            try {
                $res = $guzzle->request( 'HEAD', $post->guid, [
                    'allow_redirects' => true,
                ] );
            } catch ( \Exception $ex ) {
                self::Info( "Error " . $ex->getMessage() . " skipping.", true );
                continue;
            }
            
            if ( $res->getStatusCode() == 200 ) {
                self::Info( "Exists ... ", false );
                $basename = basename( $post->guid );
                $postBaseUrl = str_replace( $basename, '', $post->guid );
                $key = str_replace( $s3Base, '', $post->guid );
                $baseKey = ltrim( trailingslashit( str_replace( $basename, '', $key ) ), '/' );
                $s3Info = [
                    'url'       => $post->guid,
                    'bucket'    => $s3Uploads->get_s3_bucket(),
                    'provider'  => 's3',
                    'privacy'   => $s3Acl,
                    'v'         => MEDIA_CLOUD_INFO_VERSION,
                    'key'       => $key,
                    'options'   => [],
                    'mime-type' => $post->post_mime_type,
                ];
                $meta = wp_get_attachment_metadata( $post->ID );
                $meta['file'] = $key;
                $meta['s3'] = $s3Info;
                $sizes = $meta['sizes'];
                
                if ( empty($sizes) ) {
                    self::Info( "Missing size data ... ", false );
                } else {
                    $newSizes = [];
                    foreach ( $sizes as $size => $sizeData ) {
                        $sizeUrl = trailingslashit( $postBaseUrl ) . $sizeData['file'];
                        try {
                            $res = $guzzle->request( 'HEAD', $sizeUrl, [
                                'allow_redirects' => true,
                            ] );
                        } catch ( \Exception $ex ) {
                            continue;
                        }
                        
                        if ( $res->getStatusCode() == 200 ) {
                            $s3Info = [
                                'url'       => $sizeUrl,
                                'bucket'    => $s3Uploads->get_s3_bucket(),
                                'provider'  => 's3',
                                'privacy'   => $s3Acl,
                                'v'         => MEDIA_CLOUD_INFO_VERSION,
                                'key'       => $baseKey . $sizeData['file'],
                                'options'   => [],
                                'mime-type' => $sizeData['mime-type'],
                            ];
                            $sizeData['s3'] = $s3Info;
                            $newSizes[$size] = $sizeData;
                        }
                    
                    }
                    $meta['sizes'] = $newSizes;
                }
                
                update_post_meta( $post->ID, '_wp_attachment_metadata', $meta );
                self::Info( "Done.", true );
            } else {
                self::Info( "Skipping, does not exist.", true );
            }
        
        }
    }
    
    /**
     * Fixes S3 metadata keys.  Do not use unless directed by Media Cloud support.
     *
     * ## OPTIONS
     *
     * <search>
     * : The key prefix to search for
     *
     * <replace>
     * : The replacement key prefix
     *
     * ## EXAMPLES
     *
     *     wp mediacloud fixKeys 'https://somedomain.com/uploads/' 'uploads/'
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function fixKeys( $args, $assoc_args )
    {
        if ( count( $args ) != 2 ) {
            self::Error( "fixKeys requires two arguments: wp mediacloud fixKeys <string to replace> <replacement>" );
        }
        self::Info( "Replacing {$args[0]} with {$args[1]}.\n", true );
        Command::Out( "", true );
        Command::Warn( "%WThis command will make some changes to your database that are not reversible.  Make sure to backup your database first.%n" );
        Command::Out( "", true );
        $result = \WP_CLI::confirm( "Are you sure you want to continue?", $assoc_args );
        self::Info( $result, true );
        $postArgs = [
            'post_type'   => 'attachment',
            'post_status' => 'inherit',
            'nopaging'    => true,
        ];
        $q = new \WP_Query( $postArgs );
        $postCount = count( $q->posts );
        
        if ( $postCount == 0 ) {
            self::Error( "No posts found." );
            exit( 0 );
        }
        
        self::Info( "Found {$postCount} posts.", true );
        /** @var \WP_Post $post */
        foreach ( $q->posts as $post ) {
            $meta = get_post_meta( $post->ID, '_wp_attachment_metadata', true );
            $isS3Info = false;
            
            if ( !isset( $meta ) ) {
                $isS3Info = true;
                $meta = get_post_meta( $post->ID, 'ilab_s3_info', true );
            }
            
            
            if ( empty($meta) ) {
                self::Warn( "Post {$post->ID} has no metadata." );
                continue;
            }
            
            $changed = false;
            
            if ( isset( $meta['file'] ) && strpos( $meta['file'], $args[0] ) !== false ) {
                $changed = true;
                $meta['file'] = str_replace( $args[0], $args[1], $meta['file'] );
            }
            
            if ( isset( $meta['s3'] ) ) {
                
                if ( isset( $meta['s3']['key'] ) && strpos( $meta['s3']['key'], $args[0] ) !== false ) {
                    $changed = true;
                    $meta['s3']['key'] = str_replace( $args[0], $args[1], $meta['s3']['key'] );
                }
            
            }
            if ( isset( $meta['sizes'] ) ) {
                foreach ( $meta['sizes'] as $size => $sizeData ) {
                    if ( isset( $sizeData['s3'] ) ) {
                        
                        if ( isset( $sizeData['s3']['key'] ) && strpos( $sizeData['s3']['key'], $args[0] ) !== false ) {
                            $changed = true;
                            $meta['sizes'][$size]['s3']['key'] = str_replace( $args[0], $args[1], $sizeData['s3']['key'] );
                        }
                    
                    }
                }
            }
            
            if ( $changed ) {
                self::Info( "Post ID # {$post->ID} {$post->post_name} changed.", true );
                
                if ( $isS3Info ) {
                    update_post_meta( $post->ID, 'ilab_s3_info', $meta );
                } else {
                    update_post_meta( $post->ID, '_wp_attachment_metadata', $meta );
                }
            
            } else {
                self::Info( "Post ID # {$post->ID} is not changed.", true );
            }
        
        }
    }
    
    /**
     * Verifies the media library's cloud storage status
     *
     * ## OPTIONS
     *
     * <filename>
     * : The filename for the CSV report to generate
     *
     * [--limit=<number>]
     * : The maximum number of items to process, default is infinity.
     *
     * [--offset=<number>]
     * : The starting offset to process.  Cannot be used with page.
     *
     * [--page=<number>]
     * : The starting offset to process.  Page numbers start at 1.  Cannot be used with offset.
     *
     * ## EXAMPLES
     *
     *     wp mediacloud verify verify.csv
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function verify( $args, $assoc_args )
    {
        if ( count( $args ) == 0 ) {
            self::Error( "Missing required argument.  Run the command: wp mediacloud verify <filename.csv>" );
        }
        $allSizes = ilab_get_image_sizes();
        $sizeKeys = array_keys( $allSizes );
        $sizeKeys = array_sort( $sizeKeys );
        /** @var StorageTool $storageTool */
        $storageTool = ToolsManager::instance()->tools['storage'];
        $csvFileName = $args[0];
        if ( strpos( $csvFileName, '/' ) !== 0 ) {
            $csvFileName = trailingslashit( getcwd() ) . $csvFileName;
        }
        if ( file_exists( $csvFileName ) ) {
            unlink( $csvFileName );
        }
        $headers = array_merge( array_merge( [
            'Post ID',
            'Mime Type',
            'S3 Metadata Status',
            'Attachment URL',
            'Original Source Image URL'
        ], $sizeKeys ), [ 'Notes' ] );
        $reporter = new TaskReporter( $csvFileName, $headers, true );
        $queryArgs = [
            'post_type'   => 'attachment',
            'post_status' => 'inherit',
            'fields'      => 'ids',
            'orderby'     => 'date',
            'order'       => 'desc',
            'meta_query'  => [
            'relation' => 'OR',
            [
            'key'     => '_wp_attachment_metadata',
            'value'   => '"s3"',
            'compare' => 'LIKE',
            'type'    => 'CHAR',
        ],
            [
            'key'     => 'ilab_s3_info',
            'compare' => 'EXISTS',
        ],
        ],
        ];
        
        if ( isset( $assoc_args['limit'] ) ) {
            $queryArgs['posts_per_page'] = $assoc_args['limit'];
            
            if ( isset( $assoc_args['page'] ) ) {
                $queryArgs['offset'] = max( 0, ($assoc_args['page'] - 1) * $assoc_args['limit'] );
            } else {
                if ( isset( $assoc_args['offset'] ) ) {
                    $queryArgs['offset'] = $assoc_args['offset'];
                }
            }
        
        } else {
            $queryArgs['posts_per_page'] = -1;
        }
        
        $query = new \WP_Query( $queryArgs );
        $postIds = $query->posts;
        add_filter( 'media-cloud/dynamic-images/skip-url-generation', '__return_true' );
        foreach ( $postIds as $postId ) {
            self::Info( "Processing {$postId} ... " );
            $storageTool->verifyPost( $postId, $reporter, function ( $message, $newLine = false ) {
                self::Info( $message, $newLine );
            } );
            self::Info( "Done.", true );
        }
        remove_filter( 'media-cloud/dynamic-images/skip-url-generation', '__return_true' );
        $reporter->close();
    }
    
    /**
     * Syncs cloud storage to the local file system
     *
     * ## OPTIONS
     *
     * <filename>
     * : The filename for the CSV report to generate
     *
     * [--limit=<number>]
     * : The maximum number of items to process, default is infinity.
     *
     * [--offset=<number>]
     * : The starting offset to process.  Cannot be used with page.
     *
     * [--page=<number>]
     * : The starting offset to process.  Page numbers start at 1.  Cannot be used with offset.
     *
     * ## EXAMPLES
     *
     *     wp mediacloud syncLocal sync.csv
     *
     * @when after_wp_load
     *
     * @param $args
     * @param $assoc_args
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function syncLocal( $args, $assoc_args )
    {
        if ( count( $args ) == 0 ) {
            self::Error( "Missing required argument.  Run the command: wp mediacloud syncLocal <filename.csv>" );
        }
        $allSizes = ilab_get_image_sizes();
        $sizeKeys = array_keys( $allSizes );
        $sizeKeys = array_sort( $sizeKeys );
        $sizeKeysLocal = [];
        foreach ( $sizeKeys as $key ) {
            $sizeKeysLocal[] = $key;
            $sizeKeysLocal[] = "{$key} Local";
        }
        /** @var StorageTool $storageTool */
        $storageTool = ToolsManager::instance()->tools['storage'];
        $csvFileName = $args[0];
        if ( strpos( $csvFileName, '/' ) !== 0 ) {
            $csvFileName = trailingslashit( getcwd() ) . $csvFileName;
        }
        if ( file_exists( $csvFileName ) ) {
            unlink( $csvFileName );
        }
        $headers = array_merge( array_merge( [
            'Post ID',
            'Mime Type',
            'S3 Metadata Status',
            'Attachment URL',
            'Attachment Local',
            'Original Source Image URL',
            'Original Source Image Local'
        ], $sizeKeysLocal ), [ 'Notes' ] );
        $reporter = new TaskReporter( $csvFileName, $headers, true );
        $queryArgs = [
            'post_type'   => 'attachment',
            'post_status' => 'inherit',
            'fields'      => 'ids',
            'orderby'     => 'date',
            'order'       => 'desc',
            'meta_query'  => [
            'relation' => 'OR',
            [
            'key'     => '_wp_attachment_metadata',
            'value'   => '"s3"',
            'compare' => 'LIKE',
            'type'    => 'CHAR',
        ],
            [
            'key'     => 'ilab_s3_info',
            'compare' => 'EXISTS',
        ],
        ],
        ];
        
        if ( isset( $assoc_args['limit'] ) ) {
            $queryArgs['posts_per_page'] = $assoc_args['limit'];
            
            if ( isset( $assoc_args['page'] ) ) {
                $queryArgs['offset'] = max( 0, ($assoc_args['page'] - 1) * $assoc_args['limit'] );
            } else {
                if ( isset( $assoc_args['offset'] ) ) {
                    $queryArgs['offset'] = $assoc_args['offset'];
                }
            }
        
        } else {
            $queryArgs['posts_per_page'] = -1;
        }
        
        $query = new \WP_Query( $queryArgs );
        $postIds = $query->posts;
        add_filter( 'media-cloud/dynamic-images/skip-url-generation', '__return_true' );
        foreach ( $postIds as $postId ) {
            self::Info( "Processing {$postId} ... " );
            $storageTool->syncLocal( $postId, $reporter, function ( $message, $newLine = false ) {
                self::Info( $message, $newLine );
            } );
            self::Info( "Done.", true );
        }
        remove_filter( 'media-cloud/dynamic-images/skip-url-generation', '__return_true' );
        $reporter->close();
    }
    
    public static function Register()
    {
        \WP_CLI::add_command( 'mediacloud', __CLASS__ );
    }

}