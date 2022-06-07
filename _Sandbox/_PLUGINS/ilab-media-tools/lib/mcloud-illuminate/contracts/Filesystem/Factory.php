<?php

namespace MediaCloud\Vendor\Illuminate\Contracts\Filesystem;

interface Factory
{
    /**
     * Get a filesystem implementation.
     *
     * @param  string  $name
     * @return \MediaCloud\Vendor\Illuminate\Contracts\Filesystem\Filesystem
     */
    public function disk($name = null);
}
