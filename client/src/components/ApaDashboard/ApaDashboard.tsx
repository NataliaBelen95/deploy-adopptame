import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { Table, Space } from 'antd';
import { getPets, setAdoption } from '../../redux/actions/actions';
import style from "../AdminDashboard/AdminDashboard.module.css"
import { Reducer } from '../../redux/store/store';
import { Link } from 'react-router-dom';


export const ApaDashboard = () => {
    const dispatch = useDispatch();

    const pets = useSelector((state: Reducer) => state.allPets);
    const logueados = useSelector((state: Reducer) => state.Loguins);

    const petsFilter = pets?.filter((pet) => pet.apa?._id === logueados.apaFound?._id)

    const [buttons, setButtons] = useState<boolean[]>([]);

    useEffect(() => {
        dispatch(getPets() as any as AnyAction)
    }, [dispatch])
    ///LA TABLA TIENE QUE TENER UN BOTON DE EDITAR PET Y OTRO DE DISPONIBLE NO DISPONIBLE

    const handleAdoption = async (id: string, adoption: boolean, index: number, ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault();
        await dispatch(setAdoption(id, adoption) as any as AnyAction);
        const updatedButtons = [...buttons];
        updatedButtons[index] = !updatedButtons[index];
        setButtons(updatedButtons);
        if (adoption) {
            alert("Mascota disponible para ser adoptada")
        } else {
            alert("Mascota no disponible")
        }
    };


    const columnsPet = [
        {
            title: 'Nombre Mascota',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
            render: (text: string, record: any) => (
                <Link to={`/formEditPet/${record._id}`}>{text}</Link>)
        },
        {
            title: 'Tipo de Animal',
            dataIndex: 'type',
            key: 'type',
            filters: [
                { text: 'perro', value: 'perro' },
                { text: 'gato', value: 'gato' },
                { text: 'otros', value: 'otros' },
            ],
            onFilter: (value: any, record: any) => record.type === value,
        },

        {
            title: 'Edad',
            dataIndex: 'age',
            key: 'age',
            sorter: (a: any, b: any) => a.age.localeCompare(b.age),
        },

        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (text: boolean, record: any) => text ? <span>Inactivo</span> : <span>Activo</span>,
        },

        {
            title: 'En Adopcion',
            dataIndex: 'adoption',
            key: 'adoption',
            render: (text: string, record: any, index: number) => (
                <Space size="middle">
                    <button key={record._id} onClick={(ev) => handleAdoption(record._id, !buttons[index], index, ev)}>
                        {buttons[index] ? "Disponible" : "No Disponible"}
                    </button>
                </Space>
            ),
        },
    ];
    return (
        <div className={style.containerTable}>
            <h2 className={style.tituloTabla}>MASCOTAS</h2>
            <Table className={style.tabla} columns={columnsPet} dataSource={petsFilter} />
        </div>
    );

}