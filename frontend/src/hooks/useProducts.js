import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createProduct, deleteProduct, getAllProducts, getMyProducts, getProductById} from "../lib/api.js";

export const useProducts = () => {
     return useQuery({queryKey: ["products"], queryFn: getAllProducts});

}

export const useCreateProduct = () => {
    return useMutation({mutationFn: createProduct});
}

export const useProduct = (id) => {
   return useQuery({queryKey: ["product", id], queryFn: () => getProductById(id), enabled: !!id})
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["myProducts"]});
        }

    });
}

export const useMyProducts = () => {
    return useQuery({queryKey: ["myProducts"], queryFn: getMyProducts});
}