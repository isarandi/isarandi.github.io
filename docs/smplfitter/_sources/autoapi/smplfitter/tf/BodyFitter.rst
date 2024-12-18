smplfitter.tf.BodyFitter
========================

.. py:class:: smplfitter.tf.BodyFitter(body_model, num_betas = 10, enable_kid = False, vertex_subset=None, joint_regressor=None)

   Fits body model (SMPL/SMPL-X/SMPL+H) parameters to target vertices and joints.

   :param body_model: The SMPL model instance we wish to fit, of a certain model variant and gender.
   :param num_betas: Number of shape parameters (betas) to use when fitting.
   :param enable_kid: Enables the use of a kid blendshape, allowing for fitting kid shapes as in
                      AGORA.
   :param vertex_subset: A tensor or list specifying a subset of vertices to use in the fitting
                         process, allowing faster partial fitting. The subset of vertices should cover all body
                         parts to provide enough constraints.
   :param joint_regressor: A regression matrix of shape (num_joints, num_vertices) for obtaining
                           joint locations, in case the target joints are not specified when fitting. A custom one
                           must be supplied if `vertex_subset` is partial and target joint locations will not be
                           provided.


   .. py:method:: fit(target_vertices, target_joints = None, vertex_weights = None, joint_weights = None, num_iter = 1, beta_regularizer = 1, beta_regularizer2 = 0, scale_regularizer = 0, kid_regularizer = None, share_beta = False, final_adjust_rots = True, scale_target = False, scale_fit = False, allow_nan = False, requested_keys=())

      Fits the body model to target vertices and optionally joints by optimizing for shape and
      pose, and optionally others.

      :param target_vertices: Target mesh vertices, shaped as (batch_size, num_vertices, 3).
      :param target_joints: Target joint locations, shaped as (batch_size, num_joints, 3).
      :param vertex_weights: Importance weights for each vertex during the fitting process.
      :param joint_weights: Importance weights for each joint during the fitting process.
      :param num_iter: Number of iterations for the optimization process. Reasonable values are in
                       the range of 1-4.
      :param beta_regularizer: L2 regularization weight for shape parameters (betas).
                               Set small for easy poses and extreme body shapes, set high for harder poses and
                               non-extreme body shape. (Good choices can be 0, 0.1, 1, 10.)
      :param beta_regularizer2: Secondary regularization for betas, affecting the first two
                                parameters. Often zero works well.
      :param scale_regularizer: Regularization term to penalize the scale factor deviating from 1.
                                Has no effect unless `scale_target` or `scale_fit` is True.
      :param kid_regularizer: Regularization weight for the kid blendshape factor. Has no effect
                              unless `enable_kid` on the object is True.
      :param share_beta: If True, shares the shape parameters (betas) across instances in the
                         batch.
      :param final_adjust_rots: Whether to perform a final refinement of the body part
                                orientations to improve alignment.
      :param scale_target: If True, estimates a scale factor to apply to the target vertices for
                           alignment.
      :param scale_fit: If True, estimates a scale factor to apply to the fitted mesh for
                        alignment.
      :param allow_nan: If True, allows NaN values in the output. If False, replaces NaN values
                        with zeros.
      :param requested_keys: List of keys specifying which results to return.

      :returns:

                A dictionary containing the following items, based on requested keys
                    - **pose_rotvecs** -- Estimated pose in concatenated rotation vector format
                    - **shape_betas** -- Estimated shape parameters (betas)
                    - **trans** -- Estimated translation parameters
                    - **joints** -- Estimated joint positions, if requested
                    - **vertices** -- Fitted mesh vertices, if requested
                    - **orientations** -- Global body part orientations as rotation matrices
                    - **relative_orientations** -- Parent-relative body part orientations as rotation                     matrices
                    - **kid_factor** -- Estimated kid blendshape factor, if `enable_kid` is True
                    - **scale_corr** -- Estimated scale correction factor, if `scale_target` or                     `scale_fit` is True



.. footbibliography::