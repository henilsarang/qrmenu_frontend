import { IoMdArrowBack } from 'react-icons/io';
import { Row, Col, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { fetchPlace } from '../apis';
import AuthContext from '../context/AuthContext';
import MainLayout from '../layout/MainLayout';
import styled from 'styled-components';
import MenuItemForm from '../container/MenuItemForm';
import MenuItem from '../components/MenuItems';

const Panel = styled.div`
    background-color:white;
    padding: 30px;
    border-radius:5px;
    box-shadow: 1px  1px 10px rgba(0,0,0,0.5);

`;


const Place = () => {
    const [place, setPlace] = useState({});
    const auth = useContext(AuthContext);
    const params = useParams(); 
    const history = useHistory();
    
    const onBack = () => history.push("/places");
    const onFetchPlace = async () => {
        const json = await fetchPlace(params.id, auth.token);
        if (json) {
            setPlace(json);
        }
        console.log(place.name);
    };

    useEffect(() => {
        onFetchPlace();
    }, []);

    return (
        <MainLayout>
            <Row>
                <Col lg={12}>
            
                    <div className="mb-4">
                        <div className="d-flex align-items-center">
                            <Button variant="link" onClick={onBack}>
                                <IoMdArrowBack size={25} color="black"/>
                            </Button>
                            <h3 className="mb-0 ml-2 mr-2">{place.name}</h3>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <Panel>
                        <MenuItemForm place={place} onDone={onFetchPlace}/>
                    </Panel>
                </Col>
                <Col md={8}>
                    {place?.categories?.map((category) => (
                        <div key={category.id} className="mb-5">
                            <h4 className="mb-0 mr-2 mb-4">
                                <b>{category.name}</b>
                            </h4>
                            
                            {category.menu_items.map((item) => (
                                <MenuItem key={item.id} item={item}/>
                            ))
                            }
                        </div>
                    ))}
                </Col>

            </Row>
        </MainLayout>
    )
}

export default Place;