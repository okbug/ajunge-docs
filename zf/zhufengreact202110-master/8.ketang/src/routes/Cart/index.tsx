
import React, { PropsWithChildren } from 'react'
import { connect } from 'react-redux'
import { CombinedState } from '@/store/reducers';
import { CartState } from '@/typings/cart';
import actionCreators from '@/store/actionCreators/cart';
import { RouteComponentProps } from 'react-router-dom';
import NavHeader from '@/components/NavHeader';
import { Table, InputNumber, Popconfirm, Button, Row, Col, Badge } from 'antd';
import { CartItem } from '@/typings/cart';
import { Lesson } from '@/typings/lesson';
type DispatchProps = typeof actionCreators;//把actionCreators映射为属性对象
type StateProps = ReturnType<typeof mapStateToProps>//把mapStateToProps返回值类型映射为属性对象
interface Params { }
type Props = PropsWithChildren<RouteComponentProps<Params> & DispatchProps & StateProps>;
function Cart(props: Props) {
    const columns = [
        {
            title: '商品',
            dataIndex: 'lesson',
            render: (value: Lesson, row: CartItem) => (
                <>
                    <p>{value.title}</p>
                    <p>单价:{value.price}</p>
                </>
            )
        },
        {
            title: '数量',
            dataIndex: 'amount',
            render: (value: number, row: CartItem) => (
                <InputNumber
                    size={"small"}
                    min={1}
                    max={100}
                    value={value}
                    onChange={(value: number) => props.changeCartItemAmount(row.lesson.id, value)}
                />
            )
        },
        {
            title: '操作',
            render: (value: any, row: CartItem) => (
                <Popconfirm
                    title="是否确定删除此商品"
                    okText="是"
                    cancelText="否"
                    onConfirm={() => props.removeCartItem(row.lesson.id)}
                >
                    <Button size="small" type="primary">删除</Button>
                </Popconfirm>
            )
        }
    ]
    const rowSelection = {
        selectedRowKeys: props.cart.filter((item: CartItem) => item.checked).map((item: CartItem) => item.lesson.id)
        ,
        onChange: (selectedRowKeys: string[]) => {
            props.changeCheckedCartItems(selectedRowKeys);
        }
    }
    let totalCount: number = props.cart.filter((item: CartItem) => item.checked).reduce((total: number, item: CartItem) => total + item.amount, 0);
    let totalPrice: number = props.cart.filter((item: CartItem) => item.checked).
        reduce((total: number, item: CartItem) => total + (item.amount * parseFloat(item.lesson.price)), 0);
    return (
        <>
            <NavHeader history={props.history}>购物车</NavHeader>
            <Table
                rowKey={(row: CartItem) => row.lesson.id}
                columns={columns}
                dataSource={props.cart}
                rowSelection={rowSelection}
                pagination={false}
                size={"small"}
            />
            <Row style={{ padding: '5px' }}>
                <Col span={4}>
                    <Button type="primary" size="small" onClick={props.clearCartItems}>清空</Button>
                </Col>
                <Col span={9}>
                    已经选择了{totalCount > 0 ? <Badge count={totalCount} /> : 0}件商品
                </Col>
                <Col span={7}>
                    总价 {totalPrice}元
                </Col>
                <Col span={4}>
                    <Button type="primary" size="small" onClick={props.settle}>结算</Button>
                </Col>
            </Row>
        </>
    )
}
function mapStateToProps(state: CombinedState): { cart: CartState } {
    return { cart: state.cart };
}
export default connect(mapStateToProps, actionCreators)(Cart);