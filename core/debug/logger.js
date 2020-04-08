export default class Logger {
    static printMessage(...args) {
        console.log("%c[message]", "color: steelBlue; font-family: 'SF Mono Medium';", ...args);

        return Logger;
    }

    static printError(...args) {
        console.log(
            "%c[message]",
            "color: #ff5353; font-family: 'SF Mono Medium';",
            ...args
        );

        return Logger;
    }
}