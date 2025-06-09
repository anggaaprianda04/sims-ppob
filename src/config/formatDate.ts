const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dateDay = date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const time = date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return `${dateDay} ${time} WIB`;
};

export { formatDate };