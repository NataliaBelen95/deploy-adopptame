import { Card } from '../Card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '../../redux/reducer/reducer'
import { Pet } from '../../redux/types'
import { useEffect, useState } from 'react'
import { getPets, OrderByAge, FilteredBySize, FilterByLocation } from '../../redux/actions/actions'
import { AnyAction, } from 'redux'
import { useParams } from 'react-router-dom'
import PaginationControlled from '../Pagination/Pagination'
import './Cards.css'
import { Reducer } from '../../redux/store/store'
// interface RootState {
//   allPets: Pet[];
//   petsFilter: Pet[];
// }

export const Cards = () => {
  const [orderBy, setOrderBy] = useState('');
  const pets = useSelector((state: Reducer) => state.allPets);
  const { category } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Agregamos estado para currentPage
  const [orden, setOrden] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const originalArray = pets.map((el: Pet) => el.apa?.provincia).filter(Boolean);
  const uniqueArray = Array.from(new Set(originalArray));
  const PageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Actualizamos el estado de currentPage al seleccionar una pÃ¡gina
  };

  useEffect(() => {
    dispatch(getPets() as unknown as AnyAction)

  }, [dispatch])
  useEffect(() => {
    localStorage.setItem("pets", JSON.stringify(pets));
  }, [pets]);
  console.log(pets)

  const HandlerFilteredSize: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setOrderBy(e.target.value);
    e.preventDefault();
    const size = e.target.value;
    dispatch(FilteredBySize(size))
    setSelectedSize(size);
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }


  const HandlerOrderByAge: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setOrderBy(e.target.value);
    e.preventDefault();
    const age = e.target.value;
    dispatch(OrderByAge(age))
    setCurrentPage(1);
    setOrden(`Ordenado ${age}`)
  }

  const HandlerFilteredLocation: React.ChangeEventHandler<HTMLSelectElement> = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const provincia = e.target.value;
    dispatch(FilterByLocation(provincia))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }


  const filteredPets = pets.filter((pet: Pet) => {
    if (category === 'dogs') {
      return pet.type === 'dogs' && pet.size === selectedSize;
    } else {
      return pet.type === category;
    }
  });
  console.log("filteredPets", filteredPets)

  const itemsPerPage = 8;
  const totalItems = filteredPets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredPets.slice(startIndex, endIndex);


  return (

    <>
      <div className="container-pets">
        <div className="containerFiltros">
          <select value={orderBy} onChange={e => HandlerOrderByAge(e)}>
            <option value="" disabled>(Seleccionar por edad)</option>
            <option value="asc">Menor</option>
            <option value="desc">Mayor</option>
          </select>

          {window.location.pathname !== "/pets/gato" && (
            <select value={orderBy} onChange={e => HandlerFilteredSize(e)}>
              <option value="" disabled>(Seleccionar por tamaño)</option>
              <option value="chico">Pequeños</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
          )}
          <select onChange={HandlerFilteredLocation}>
            <option value="" disabled>(Seleccionar por localidad)</option>
            <option value="All">Todos</option>
            {uniqueArray.map((el) => (
              <option key={el} value={el}>{el}</option>
            ))}
          </select>

        </div>
        <div className='container-cards-pets-wrapper'>
          <div className='container-cards-pets'>
            {currentItems.map((pet: Pet) => (
              <Card key={pet._id} pet={pet} />
            ))}
          </div>

        </div>
        <div className="pagination-wrapper">
          <PaginationControlled
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={PageChange}
          />
        </div>
      </div>
    </>
  );
};
