import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { Table, Space } from 'antd';
import { getApas } from '../../redux/actions/actions';
import style from "../AdminDashboard/AdminDashboard.module.css"
import { Reducer } from '../../redux/store/store';
import { Link } from 'react-router-dom';
import { Select } from 'antd';
import { Apa } from '../../redux/types';
const { Option } = Select;

const provinciasH = ["Ciudad Autónoma de Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán"]


const columnsApa = [
    {
        title: 'Refugios de Animales',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: any) => (
            <Link to={`/myProfileApa/${record.key}`}>{text}</Link>
        )
    },
    {
        title: 'Localidad',
        dataIndex: 'location',
        key: 'location'
    },
    {
        title: 'provincia',
        dataIndex: 'provincia',
        key: 'provincia'
    }
];
const SeeApas = () => {
    const dispatch = useDispatch();
    const apas = useSelector((state: Reducer) => state.allApas);
    const [selectedProvince, setSelectedProvince] = useState<string>('');

    useEffect(() => {
        dispatch(getApas() as any as AnyAction);
    }, [dispatch]);

    const handleProvinceChange = (value: string) => {
        setSelectedProvince(value);
    };

    const filteredProvincias = provinciasH.map((provincia) => ({
        value: provincia,
        label: provincia,
    }));

    const filteredApas = apas.filter((apa) => {
        return selectedProvince === '' || apa.provincia === selectedProvince;
    });

    const data = filteredApas.map((apa) => {
        return {
            key: apa._id,
            name: apa.name,
            location: apa.location,
            provincia: apa.provincia
        };
    });

    return (
        <div>
            <div className={style.containerTable}>
                <div className={style.filter} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Select placeholder="Filtrar por provincia" style={{ width: 200 }} onChange={handleProvinceChange} allowClear options={filteredProvincias} />
                </div>
                {data.length ? (
                    <Table className={style.tabla} columns={columnsApa} dataSource={data} />
                ) : (
                    <p>No hay asociaciones en esta ubicación aún</p>
                )}
            </div>
        </div>
    );
};

export default SeeApas;