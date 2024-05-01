import './styles.css';
import { Product } from '../../../../types/product';
import ProductCard from '../../components/ProductCard';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import { SpringPage } from '../../../../types/springpage';
import * as productService from '../../../../services/product-service';

type QueryParams = {
  page: number;
  name: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  const [page, setPage] = useState<SpringPage>();

  function handleSearch(searchText: string) {
    setQueryParams({ ...queryParams, page: 0, name: searchText });
  }

  function handleNextPage() {
    setQueryParams({ ...queryParams, name: "", page: queryParams.page + 1 });
  }

  function handlePreviousPage() {
    setQueryParams({ ...queryParams, name: "", page: queryParams.page - 1 });
  }

  useEffect(() => {
    productService
      .findPageRequest(queryParams.page, queryParams.name)
      .then((response) => {
        console.log(response.data);
        setPage(response.data);
        setProducts(response.data.content);
      });
  }, [queryParams]);

  return (
    <div className="container">
      
      <div className="row products-container">
      <SearchBar onSearch={handleSearch} />
        {products.map((product) => (
          <div key={product.id} className="col-item col-12 col-md-6 col-xl-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item bg-white">
            {page && (
              <button
                onClick={handlePreviousPage}
                className={`page-link text-dark ${
                  page.first ? "disabled" : "bg-primary"
                }`}
              >
                Anterior
              </button>
            )}
          </li>
          <li className="page-item bg-white">
            <a className="page-link disabled" href="#">
              {"<"}
            </a>
          </li>
          <li className="page-item bg-white">
            <a className="page-link disabled" href="#">
              {"#"}
            </a>
          </li>
          <li className="page-item bg-white">
            <a className="page-link disabled" href="#">
              {">"}
            </a>
          </li>

          <li className="page-item">
            {page && (
              <button
                onClick={handleNextPage}
                className={`page-link text-dark ${
                  page.last ? "disabled" : "bg-primary"
                }`}
              >
                Próxima
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
