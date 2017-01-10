<?php

use Phalcon\Http\Response;

class UsuarioController extends \Phalcon\Mvc\Controller {

    public function indexAction() {
        $a = ["nombre" => "arnold"];
        return json_encode($a);
    }

    public function addAction() {

        $response = new Response();
        $this->view->disable();

        if ($this->request->isPost() == true) {
            $input = $this->request->getJsonRawBody();

            $usuario = new Usuario();
            $usuario->nombre = $input->nombre;
            $usuario->identificacion = $input->identificacion;
            $usuario->fecha_nacimiento = $input->fechaNacimiento;
            $usuario->genero = $input->genero;
            $usuario->estado_civil = $input->estadoCivil;
            $usuario->direccion = $input->direccion;
            $usuario->telefono = $input->telefono;

            if (!$usuario->validate()) {
                $response->setStatusCode(500, "Internal Server Error");
                $response->setJsonContent($usuario->validationResult);
                return $response;
            }

            $curr = $usuario::findFirstByIdentificacion($usuario->identificacion);

            if ($curr) {
                $response->setStatusCode(500, "Internal Server Error");
                $response->setJsonContent(["mensaje" => "Usuario existente"]);
                return $response;
            }

            if ($usuario->save()) {
                return json_encode($usuario);
            }
        } else {
            
        }
    }

    public function listAction() {
        $list = Usuario::find();

        return json_encode($list);
    }

    public function detailsAction() {

        $id = $this->request->get("id");

        $response = new Response();

        $curr = Usuario::findFirst($id);

        if (!$curr) {
            $response->setStatusCode(500, "Internal Server Error");
            $response->setJsonContent(["mensaje" => "Usuario inexistente"]);
            return $response;
        }

        return json_encode($curr);
    }

}
