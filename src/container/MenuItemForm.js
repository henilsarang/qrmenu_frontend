import { Button, Form, Popover, Overlay } from 'react-bootstrap';
import React, {useState, useContext, useRef} from 'react';
import { RiPlayListAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { addCategory,addMenuItems } from '../apis';
import AuthContext from '../context/AuthContext';
import ImageDropZone from './ImageDropZone';

const MenuItemForm = ({place,onDone}) => {

    const [categoryName, setCategoryName] = useState("");
    const [categoryFormShow, setcategoryFormShow] = useState(false);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const target = useRef(null);
    const auth = useContext(AuthContext);


    const onAddMenuItems = async () => {
        const json = await addMenuItems({
            place: place.id,
            category,
            name,
            price,
            description,
            image,
            is_available : isAvailable
        }, auth.token);

        if (json) {
            toast(`Menu Item ${json.name} was created`, { type: "success" });
            setCategory("");
            setName("");
            setPrice(0);
            setDescription("");
            setImage("");
            setIsAvailable(true);
            onDone();
        }
    }

    const onAddCategory = async () => {
        const json = await addCategory({ name: categoryName, place: place.id }, auth.token);
        if (json) {
            console.log(json);
            toast(`Category ${json.name} was created`, { type: "success" });
            setCategory(json.id);
            setCategoryName("");
            setcategoryFormShow(false);
            onDone();
        }
        
    }

    
    return (
        <div>
            {/*Category Form*/}
            <Form.Group>

                <Form.Label>Category</Form.Label>
                <div className="d-flex align-items-center">
                    <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {place?.categories?.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </Form.Control>
                    <Button ref ={target} variant="link" onClick ={() => setcategoryFormShow(true)}>
                        <RiPlayListAddFill size={25}/>
                    </Button>
                    <Overlay show={categoryFormShow} target={target.current} placement="bottom" rootClose onHide={() => setcategoryFormShow(false)}>
                        <Popover id="popover-contained">
                            <Popover.Title as="h3">Category</Popover.Title>
                            <Popover.Content>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                                    <Button variant="standard" style={{marginTop:'10px'}}block onClick={onAddCategory}>Add Category</Button>
                                </Form.Group>
                            </Popover.Content>
                        </Popover>
                    </Overlay>
                </div>
            </Form.Group>
            {/*MenuItem Form*/}
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e)=> setPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e)=> setDescription(e.target.value)}></Form.Control>  
            </Form.Group>
            <Form.Group>
                <Form.Label>Image</Form.Label>
                <ImageDropZone value={image} onChange={setImage} />
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" label="Is available" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)}/>
            </Form.Group>
            <Button variant="standard" block onClick = {onAddMenuItems}>
                + Add Menu Item
            </Button>
        </div>
    )

}
export default MenuItemForm;