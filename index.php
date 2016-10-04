<?php

require(__DIR__ . '/../vendor/autoload.php');
require(__DIR__ . '/../vendor/yiisoft/yii2/Yii.php');
require_once(__DIR__ .'/../config/Environment.php');
$environment = new Environment(Environment::VIKTOR_VAGRANT_DEVELOPMENT);
defined('YII_DEBUG') or define('YII_DEBUG',$environment->getDebug());
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL', $environment->getTraceLevel());

$config = $environment->getConfig();
(new yii\web\Application($config))->run();