import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { Table, Space } from 'antd';
import { getUsers, getPets, getApas, suspendUserOrApaAction } from '../../redux/actions/actions';
import { Reducer } from '../../redux/store/store';
import style from "../AdminDashboard/AdminDashboard.module.css"

export const AdminDashboard = () => {


    const dispatch = useDispatch();
    const users = useSelector((state: Reducer) => state.allUsers);
    const apas = useSelector((state: Reducer) => state.allApas);
    const pets = useSelector((state: Reducer) => state.allPets);

    useEffect(() => {
        dispatch(getApas() as any as AnyAction)
        dispatch(getUsers() as any as AnyAction)
        dispatch(getPets() as any as AnyAction)
    }, [dispatch])


    const handleSuspended = async (id: string, suspended: boolean, index: number, ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault();
        await dispatch(suspendUserOrApaAction(id, suspended) as any as AnyAction);
        const updatedButtons = [...buttons];
        updatedButtons[index] = !updatedButtons[index];
        setButtons(updatedButtons);
        console.log("Suspended:" + suspended)
    };

    const [buttons, setButtons] = useState<boolean[]>([]);

    const columnsUser = [
        {
            title: 'Nombres',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => <span className={style.columnsName}>{text}</span>,
        },
        {
            title: 'Nombre Usuario',
            dataIndex: 'username',
            key: 'username',
        },

        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Google Id',
            dataIndex: 'googleId',
            key: 'googleId',
        },
        {
            title: 'Suspended',
            key: 'suspended',
            render: (text: string, record: any, index: number) => (
                <Space size="middle">
                    <button key={record._id} onClick={(ev) => handleSuspended(record._id, !buttons[index], index, ev)}>
                        {buttons[index] ? "Activar" : "Suspender"}
                    </button>
                </Space>
            ),
        },
    ];

    const columnsApa = [
        {
            title: 'Nombre APA',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => <span className={style.columnsName}>{text}</span>,
        },
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Suspended',
            key: 'suspended',
            render: (text: string, record: any, index: number) => (
                <Space size="middle">
                    <button key={record._id} onClick={(ev) => handleSuspended(record._id, !buttons[index], index, ev)}>
                        {buttons[index] ? "Activar" : "Suspender"}
                    </button>
                </Space>
            ),
        },
    ];
    const columnsPet = [
        {
            title: 'Nombre Mascota',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
            render: (text: string, record: any) => <span className={style.columnsName}>{text}</span>,
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
            render: (text: boolean, record: any) => text ? <span>Activo</span> : <span>Inactivo</span>,
        },

        {
            title: 'En Adopcion',
            dataIndex: 'adoption',
            key: 'adoption',
            render: (text: boolean, record: any) => text ? <span>Si</span> : <span>No</span>,
        },
    ];

    return (
        <div className={style.containerTable}>

            <h2 className={style.tituloTabla}>USUARIOS</h2>
            <Table className={style.tabla} columns={columnsUser} dataSource={users} />
            <h2 className={style.tituloTabla}>ASOCIACIONES PROTECTORAS DE ANIMALES</h2>
            <Table className={style.tabla} columns={columnsApa} dataSource={apas} />
            <h2 className={style.tituloTabla}>MASCOTAS</h2>
            <Table className={style.tabla} columns={columnsPet} dataSource={pets} />
        </div>
    );
};

export default AdminDashboard;
