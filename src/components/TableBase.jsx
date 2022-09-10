import IconBase from "./IconBase";
import { useEffect, useState } from "react";

export default function TableBase({
  title,
  resource,
  headers,
  limitPerPage,
  count,
  isLoading,
  nextUrl,
  nextPage,
  prevPage,
  minLoadingItems,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [renderedResource, setRenderedResource] = useState([]);
  const [iconBase, setIconBase] = useState("minus");

  useEffect(() => {
    if (resource) {
      setRenderedResource(resource);
    }
  }, [resource]);

  const handleSearchValue = ({ target }) => {
    if (target.value) {
      setSearchValue(target.value);
      filterResource();
    } else {
      setSearchValue("");
      setRenderedResource(resource);
    }
  };

  const filterResource = () => {
    let filtered = renderedResource.filter((obj) =>
      Object.keys(obj).some((key) =>
        obj[key].toString().toLowerCase().includes(searchValue)
      )
    );
    setRenderedResource(filtered);
  };

  const sortResource = () => {
    switch (iconBase) {
      case "minus":
        setIconBase("arrow_up");
        setRenderedResource(
          [...renderedResource].sort((a, b) => {
            return b.name.localeCompare(a.name);
          })
        );
        break;
      case "arrow_up":
        setIconBase("arrow_down");
        setRenderedResource(
          [...renderedResource].sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
        );
        break;
      case "arrow_down":
        setIconBase("minus");
        setRenderedResource(resource);
        break;
      default:
        setIconBase("minus");
    }
  };

  return (
    <div class="container">
      <h1>{title}</h1>
      <input
        id="tt"
        type="text"
        value={searchValue}
        onChange={handleSearchValue}
        placeholder="Search "
      />
      <table class="rwd-table">
        <tbody>
          <tr>
            {headers
              ? headers.map((obj, index) => {
                  return (
                    <td>
                      {obj.label}
                      {obj.sortable ? (
                        <span onClick={sortResource}>
                          <IconBase variant={iconBase} />
                        </span>
                      ) : null}
                    </td>
                  );
                })
              : null}
          </tr>

          {!isLoading
            ? renderedResource?.map((obj, index) => {
                return (
                  <tr>
                    {headers.map((nestedObj) => {
                      return <td>{obj[nestedObj.name]}</td>;
                    })}
                  </tr>
                );
              })
            : [...Array(minLoadingItems)].map((el, index) => {
                return (
                  <tr>
                    {headers.map((nestedEl) => {
                      return (
                        <td>
                          <span className="loading"></span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
        </tbody>
      </table>
      <div class="controls">
        <button onClick={prevPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
      <p>
        Displaying {renderedResource.length} of {count} records
      </p>
    </div>
  );
}

// sort, cleanup, write docs, deploy
