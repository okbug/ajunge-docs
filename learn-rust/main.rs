/**
 * 所有权问题
 */

// fn main() {
//     let a = "hello";
//     let b = "hello".to_string();
//     let c = a;
//     println!("{:?}", a);
//     let c = b;
//     println!("{:?}", b);
//     //               ^ value borrowed here after move
// }


/**
 * 借用的概念
 */

// fn main() {
//     let a = [1, 2, 3];
//     let b = &a;
//     println!("{:p}", b); // 0x16fd1f14c
//     // 可变绑定
//     let mut c = vec![1, 2, 3];
//     // &mut 是可变引用，要想可变引用，在绑定的时候也必须是可变
//     let d = &mut c; // c 和 d 是同一个内存地址
//     d.push(4);
//     println!("{:?}", d); // [1, 2, 3, 4]
//     println!("{:?}", c); // [1, 2, 3, 4]
//     let e = &42;
//     assert_eq!(42, *e)
// }