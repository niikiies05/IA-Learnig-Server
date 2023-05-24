import IStudent from '@/resources/interfaces/student/student.interface';

interface InterestCount {
    [interest: string]: number;
}

export const analyzeNavigationHistory = (student: IStudent): string[] => {
    const interestsCount: InterestCount = {};

    // Parcourir l'historique de navigation et compter les occurrences de chaque centre d'intérêt
    student.navigationHistory.forEach((module) => {
        module.interests.forEach((interest: string | number) => {
            if (interestsCount[interest]) {
                interestsCount[interest]++;
            } else {
                interestsCount[interest] = 1;
            }
        });
    });

    // Trier les centres d'intérêt en fonction du nombre d'occurrences et sélectionner les plus fréquents
    const sortedInterests = Object.entries(interestsCount).sort(
        (a, b) => b[1] - a[1]
    );
    const topInterests = sortedInterests.slice(0, 5).map((entry) => entry[0]);

    return topInterests;
};
