<?php
/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 29.12.2014
 * Time: 22:52
 */

namespace TheBlackLion\LExSplitterBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PaymentController extends Controller
{
    public function addAction()
    {
        return $this->render('TheBlackLionLExSplitterBundle:Payment:add.html.twig');
    }
}