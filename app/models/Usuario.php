<?php

class Usuario extends \Phalcon\Mvc\Model {

    /**
     *
     * @var integer
     * @Primary
     * @Identity
     * @Column(type="integer", length=11, nullable=false)
     */
    public $id;

    /**
     *
     * @var string
     * @Column(type="string", length=30, nullable=true)
     */
    public $nombre;

    /**
     *
     * @var string
     * @Column(type="string", length=20, nullable=false)
     */
    public $identificacion;

    /**
     *
     * @var string
     * @Column(type="string", nullable=true)
     */
    public $fecha_nacimiento;

    /**
     *
     * @var string
     * @Column(type="string", length=1, nullable=true)
     */
    public $genero;

    /**
     *
     * @var string
     * @Column(type="string", length=2, nullable=true)
     */
    public $estado_civil;

    /**
     *
     * @var string
     * @Column(type="string", length=20, nullable=true)
     */
    public $direccion;

    /**
     *
     * @var string
     * @Column(type="string", length=12, nullable=true)
     */
    public $telefono;
    public $validationResult;

    /**
     * Initialize method for model.
     */
    public function initialize() {
        $this->setSchema("test");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource() {
        return 'usuario';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Usuario[]|Usuario
     */
    public static function find($parameters = null) {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Usuario
     */
    public static function findFirst($parameters = null) {
        return parent::findFirst($parameters);
    }

    /**
     * Valida que los campos obligatorios existan
     */
    public function validate() {
        $this->validationMessage = [];
        if ($this->identificacion == null) {
            $this->validationResult["identificacion"] = "El campo identificación no debe ser nulo";
            return false;
        }

        return true;
    }

}
