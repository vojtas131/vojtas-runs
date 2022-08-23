export function getDuration(duration: number){
    const hours   = Math.floor(duration / 3600);
    const minutes = Math.floor(duration / 60) % 60;
    const seconds = parseFloat((duration % 60).toFixed(3));
    if(seconds)
    console.log(seconds)

    return [hours,minutes,seconds]
        .map((v,i) => v < 10 && i!==0 ? "0" + v : v)
        .filter((v, i) => v !== 0)
        .join(":")
}