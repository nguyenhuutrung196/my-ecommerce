import { FilterContext } from '@/contexts/FilterContext'
import { useContext } from 'react'

function FilterBar() {
    const { filters, setFilters } = useContext(FilterContext)

    const handleCategoryChange = cate => {
        setFilters({ ...filters, category: cate })
    }

    return (
        <div
            style={{
                padding: '20px',
                background: '#efefef',
                borderRadius: '10px'
            }}
        >
            <h3>FilterBar</h3>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                <button onClick={() => handleCategoryChange('all')}>All</button>
                <button onClick={() => handleCategoryChange('electronics')}>
                    Electronics
                </button>
                <button onClick={() => handleCategoryChange('jewelery')}>
                    Jewelery
                </button>
                <button onClick={() => handleCategoryChange(`men's clothing`)}>
                    Men Clothing
                </button>
                <button
                    onClick={() => handleCategoryChange(`women's clothing`)}
                >
                    Women Clothing
                </button>
            </div>
        </div>
    )
}

export default FilterBar
