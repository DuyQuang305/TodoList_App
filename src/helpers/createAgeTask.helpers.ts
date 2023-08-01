export const AgeTask = (status: string, updatedAt: Date, createdAt: Date) => {
    const now = new Date();

    if (status === 'Done') {
        return updatedAt.getTime() - createdAt.getTime();
    } else {
        return now.getTime() - createdAt.getTime()
    }
}