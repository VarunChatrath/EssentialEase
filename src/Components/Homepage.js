import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { toast } from "react-toastify";
import 'react-slideshow-image/dist/styles.css'
const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '500px'
}

const slideImages = [
  {
    url: 'images/slider1.png',
    caption: 'Slide1'
  },
  {
    url: 'images/slider2.jpg',
    caption: 'Slide 2'
  },
  {
    url: 'images/slider3.jpg',
    caption: 'Slide 3'
  }
  ,
  {
    url: 'images/slider4.webp',
    caption: 'Slide 4'
  }
];


var Homepage = () => {
  const [prodsdata, setprodsdata] = useState([]);
  useEffect(() => {
    fetchprods();
  }, [])
  var fetchprods = async () => {
    try {
      const resp = await fetch(`http://localhost:9000/api/fetchlatestproducts`)
      if (resp.ok) {
        var result = await resp.json();
        if (result.statuscode === 0) {
          toast.error("No products found");
          setprodsdata([]);
        }
        else if (result.statuscode === 1) {
          setprodsdata(result.prodsdata)
        }
      }
      else {
        toast.error("Error Occured")
      }
    }
    catch (err) {
      toast.error(err);
    }
  }
  return (
    <>
      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))}
        </Slide>
      </div>
      <div className="login">
        <div className="container">
          {
            prodsdata.length > 0 ?
              <>
                <h2>Latest Products</h2><br />
                {
                  prodsdata.map((data, i) =>
                    <div key={i} className="col-md-4 top_brand_left">
                      <div className="hover14 column">
                        <div className="agile_top_brand_left_grid">
                          <div className="agile_top_brand_left_grid1">
                            <figure>
                              <div className="snipcart-item block" >
                                <div className="snipcart-thumb">
                                  <Link to={`/details?pid=${data._id}`}>
                                    <img title=" " alt=" " height='125' src={`uploads/${data.prodpic}`} />
                                    <p>{data.prodname}</p>
                                  </Link>
                                </div>
                              </div>
                            </figure>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              </> : <h2>No products found</h2>
          }
        </div>
      </div>
    </>
  )
}
export default Homepage;