import React, { useState, useEffect } from 'react';
import { Grid, GridColumn, GridPageChangeEvent } from '@progress/kendo-react-grid';
import { fetchCats } from '../services/catService';

interface Cat {
  id: string;
  url: string;
}

const CatGrid: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({ skip: 0, take: 10 });
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    const loadCats = async () => {
      const data = await fetchCats(page.skip / page.take + 1, page.take, filter);
      setCats(data);
      setTotal(100); // Assuming total 100 images for demo purposes
    };
    loadCats();
  }, [page, filter]);

  const handlePageChange = (event: GridPageChangeEvent) => {
    setPage(event.page);
  };

  const toggleFilter = () => {
    setFilter(!filter);
  };

  return (
    <div>
      <label>
        Filter GIFs:
        <input type="checkbox" checked={filter} onChange={toggleFilter} />
      </label>
      <Grid
        data={cats}
        pageable
        total={total}
        skip={page.skip}
        pageSize={page.take}
        onPageChange={handlePageChange}
      >
        <GridColumn field="id" title="ID" />
        <GridColumn field="url" title="Image" cell={(props) => (
          <td>
            <img src={props.dataItem.url} alt={props.dataItem.id} style={{ width: '100px' }} />
          </td>
        )} />
      </Grid>
    </div>
  );
};

export default CatGrid;
