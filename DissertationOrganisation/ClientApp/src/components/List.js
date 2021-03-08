import React from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col
} from 'reactstrap';
import { FaRegPlusSquare } from 'react-icons/fa';
import ListItem from './ListItem.js';
import './List.css';


const List = (props) => {
    const { id, name, items } = props;
        return (
            <div>
                <Row>
                    <Col sm="6">
                        <Card id={id}>
                            <CardBody>
                                <Row>
                                    <CardTitle>{name}</CardTitle>
                                    <FaRegPlusSquare class="addButton"/>
                                </Row>
                                {items.map(item =>
                                    <ListItem key={item.id} id={item.id} listId={item.listId} title={item.title} description={item.description} state={item.state} />
                                    )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )

}
export default List