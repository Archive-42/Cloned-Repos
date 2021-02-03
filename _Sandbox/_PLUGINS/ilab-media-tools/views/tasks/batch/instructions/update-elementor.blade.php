<p>This tool will update the image URLs in your Elementor pages and posts, insuring they are correct.</p>
<p>You only need to run this task in a few situations:</p>
<ol>
    <li>You have used the <strong>Migrate to Cloud</strong> task to migrate your existing library to the cloud.</li>
    <li>You have used the <strong>Import From Cloud</strong> task to import files from the cloud into WordPress.</li>
    <li>You have made changes to Media Cloud that has changed the URL for images.  For example, specifying a CDN or enabling/disabling imgix.</li>
    <li>If none of the above applies to you, do not run this task.</li>
</ol>
@if(empty($description))
<p>You can configure this to run automatically whenever you migrate to storage or import from storage.</p>
@endif
<p><strong>Note:</strong></p>
<ol>
    <li><strong>Always backup your database before performing this operation.</strong></li>
    <li>This has not been tested with every Elementor add-on, but it has been tested with the most popular ones.  <strong>If you are using a lot of Elementor add-ons, always double check your pages after running this task.  If you find issues, please open a support ticket and be sure to specify which add-on is causing issues.</strong></li>
    <li><strong>ALWAYS BACKUP YOUR DATABASE BEFORE PERFORMING THIS OPERATION.</strong></li>
</ol>
