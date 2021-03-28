<?php
/**
 * This file is part of vfsStream.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @package  org\bovigo\vfs
 */

namespace MediaCloud\Vendor\org\bovigo\vfs;
/**
 * Helper class for the test.
 */
class TestvfsStreamWrapper extends vfsStreamWrapper
{
    /**
     * unregisters vfsStreamWrapper
     */
    public static function unregister()
    {
        if (in_array(vfsStream::SCHEME, stream_get_wrappers()) === true) {
            stream_wrapper_unregister(vfsStream::SCHEME);
        }

        self::$registered = false;
    }
}
/**
 * Test for MediaCloud\Vendor\org\bovigo\vfs\vfsStreamWrapper.
 */
class vfsStreamWrapperAlreadyRegisteredTestCase extends \BC_PHPUnit_Framework_TestCase
{
    /**
     * set up test environment
     */
    public function setUp()
    {
        TestvfsStreamWrapper::unregister();
        $mock = $this->bc_getMock('MediaCloud\\Vendor\\org\bovigo\vfs\\vfsStreamWrapper');
        stream_wrapper_register(vfsStream::SCHEME, get_class($mock));
    }

    /**
     * clean up test environment
     */
    public function tearDown()
    {
        TestvfsStreamWrapper::unregister();
    }

    /**
     * registering the stream wrapper when another stream wrapper is already
     * registered for the vfs scheme should throw an exception
     *
     * @test
     * @expectedException MediaCloud\Vendor\org\bovigo\vfs\vfsStreamException
     */
    public function registerOverAnotherStreamWrapper()
    {
        vfsStreamWrapper::register();
    }
}
