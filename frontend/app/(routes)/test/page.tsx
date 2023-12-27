import { NextPage, GetServerSideProps } from 'next';

interface Props {
    json: {
        products: object[];
    };
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const json = await res.json();

    return {
        props: {
            json,
        },
    };
};

const Page: NextPage<Props> = (props) => {
    console.log(props.json);



    return (
        <>
            {props.json.products.map((item: any) => {
                return <p key={item.id}>{item.title}</p>
            })}
        </>
    );
};



export default Page;