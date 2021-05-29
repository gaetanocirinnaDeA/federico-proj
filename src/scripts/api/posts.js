const url = "http://localhost:3000/posts";

export const posts = () => {
    return fetch(url)
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log("err", err));
};
