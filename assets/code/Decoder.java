
// Q) You are given two sorted array, A and B, where A has a large enough buffer at the end to hold B. Write a method to merge B into A in sorted order.
import java.util.*;

public class Decoder {
    public static void main(String[] args) {
        // sorted array 1
        int arr1[] = { 12, 23, 44, 51, -1, -1, -1, -1 };
        int arr2[] = { 11, 56, 90, 45 };

        System.out.println(Arrays.toString(arr1));
        System.out.println(Arrays.toString(arr2));

        
        int pos = 0;
        for (int i = 0; i < arr1.length; i++) {
            if (arr1[i] == -1) {
                pos = i;
                break;
            }
        }
        System.out.println(pos);

        for (int j : arr2) {
            
            int k = pos - 1;
            while (j < arr1[k]) {
                arr1[k + 1] = arr1[k];
                k--;
                if (k == -1)
                    break;
            }
            arr1[k + 1] = j;
            pos++;
        }

        System.out.println(Arrays.toString(arr1));
        System.out.println(Arrays.toString(arr2));

    }
}