import React from "react";
import { NavItem } from "react-bootstrap";
import styled from "styled-components";
import MenuItem from "./MenuItems";

const Place = styled.div`

    text-align:center;
    img{
        border-radius:5px;
        margin-bottom:20px;
    }

`;

const Container = styled.div`
    b,p{
        ${({font}) => font && `font-family:${font};`}
    }
`;


const MenuList = ({ place,shoppingCart={},onOrder, color ="",font = "" }) => {
 
    return(
        <Container font={font}>
            <Place>
                <img src={place.image} width={300} height={200} alt="" />
                <h3><b>{place.name}</b></h3>
            </Place>
            {place?.categories
                    ?.filter((category) => category.menu_items?.filter((i) => i.is_available).length
                ).map((category) => (
                    <div key={category.id} className="mt-5">
                        <h4>
                            <b>{category.name}</b>
                        </h4>
                        {category.menu_items.filter((i) => i.is_available).map((item) => (<MenuItem key={item.id} item={{
                            ...item,
                            quantity:shoppingCart[item.id]?.quantity,
                        }}
                            onOrder={onOrder}
                            color={color}
                        />))}
                    </div>
                    ))
            }

        </Container>
    )
   
};

export default MenuList;